import os

from textwrap import dedent
from crewai import Agent, Task, Crew, Process
from langchain_openai import ChatOpenAI
from langchain_community.tools.ddg_search import DuckDuckGoSearchRun
from langchain_community.tools.semanticscholar.tool import SemanticScholarQueryRun
from langchain_community.tools.wikidata.tool import WikidataAPIWrapper, WikidataQueryRun
from langchain_community.tools.wikipedia.tool import WikipediaQueryRun
from langchain_community.utilities.wikipedia import WikipediaAPIWrapper
from langchain_community.tools.yahoo_finance_news import YahooFinanceNewsTool
from langchain_community.tools.youtube.search import YouTubeSearchTool
from langchain_community.tools.arxiv.tool import ArxivQueryRun
from langchain_community.tools.pubmed.tool import PubmedQueryRun
from dotenv import load_dotenv

load_dotenv()

process_type = {
    "SEQUENTIAL": Process.sequential,
    "HIERARCHICAL": Process.hierarchical,
}

tool_dict = {
    "DUCK_DUCK_GO_SEARCH": DuckDuckGoSearchRun(),
    "SEMANTIC_SCHOLER": SemanticScholarQueryRun(),
    "WIKIDATA": WikidataQueryRun(api_wrapper=WikidataAPIWrapper()),
    "WIKIPEDIA": WikipediaQueryRun(api_wrapper=WikipediaAPIWrapper()),
    "YAHOO_FINANCE": YahooFinanceNewsTool(),
    "YUOUTUBE_SEARCH": YouTubeSearchTool(),
    "ARXIV": ArxivQueryRun(),
    "PUBMED": PubmedQueryRun(),
}


def run_mission(mission):
    try:
        llm = ChatOpenAI(
            model="gpt-3.5-turbo",
            #verbose=True,
            temperature=0.5,
            openai_api_key=os.getenv("OPENAI_API_KEY"),
        )

        agents = [
            Agent(
                role=agent["role"],
                goal=agent["goal"],
                backstory=agent["backstory"],
                allow_delegation=agent["allowDelegation"],
                verbose=agent["verbose"],
                tools=[tool_dict[tool] for tool in agent["tools"]],
                llm=llm,
                max_rpm=60 / len(mission["crew"]),
                memory=agent.get("memory", False),
            )
            for agent in mission["crew"]
        ]

        tasks = [
            Task(
                description=dedent(task["description"]),
                agent=(
                    [agent for agent in agents if agent.role == task["agent"]["role"]][
                        0
                    ]
                    if task["agent"]
                    else None
                ),
                expected_output=task["expected_output"],
            )
            for task in mission["tasks"]
        ]

        crew = Crew(
            agents=agents,
            tasks=tasks,
            verbose=mission["verbose"],
            process=process_type[mission["process"]],
            manager_llm=llm,
        )

        result = crew.kickoff()
        return {"result": result}
    except Exception as e:
        print(e)
        return {"error": True, "message": str(e)}


def generate_backstory(role, goal):
    try:
        llm = ChatOpenAI(
            model="gpt-3.5-turbo",
            #verbose=True,
            temperature=1.0,
            openai_api_key=os.getenv("OPENAI_API_KEY"),
        )
         
        #prompt template to send to llm role and goal and get backstory
        prompt_query = """
            Given 'role' and 'goal', delimited by triple backticks below, generate a backstory for an agent. 
            A backstory provides depth to the agent's persona, enriching its motivations and engagements 
            within the crew. Backstory is similar to system message used by an llm. For example, 
            Role: Senior Researcher
            Goal: Uncover groundbreaking technologies in Generative AI.
            Backstory: Driven by curiosity, you're at the forefront of innovation, eager to explore 
            and share knowledge that could change the world.

            Only output the backstory in the form of one sentence. Do not include any labels, comments, 
            introductory words, or newline. Do not respond in any other way.

            ```
            Role: {role}
            Goal: {goal}
            ```
            """
        
        prompt_query = prompt_query.replace("{role}", role)
        prompt_query = prompt_query.replace("{goal}", goal)
         
        print(prompt_query)

        messages = [
            ("system", "You are a helpful assistant."),
            ("human", prompt_query),
        ]
        backstory = llm.invoke(messages).content
        return {"backstory": backstory, "error": None, "message": "Success"}
    except Exception as e:
        print(e)
        return {"error": True, "message": str(e)}