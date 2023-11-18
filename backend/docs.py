from colorama import Fore
from random import shuffle

def scrape_doc_content(document_id: str) -> dict:
    """Returns the content of a Google Doc in object form. The document
    must be shared to gdocs-access@elated-aquifer-352720.iam.gserviceaccount.com,
    and the document ID must be provided."""

    from google.oauth2 import service_account
    from googleapiclient.discovery import build

    # Load the service account credentials
    creds = service_account.Credentials.from_service_account_file('elated-aquifer-352720-6be873b08fe0.json', scopes=['https://www.googleapis.com/auth/documents.readonly'])

    # Create the Google Docs API client
    docs_service = build('docs', 'v1', credentials=creds)

    # Retrieve the document content
    document = docs_service.documents().get(documentId=document_id).execute()
    doc_content = document.get('body')

    return doc_content

def compile_data() -> dict:
    """Uses the data from scrape_doc_content to interpret the table."""
    data = scrape_doc_content("1QIgfUiY0BiQ9X3H9ah95E5ejLtWurXdvjZjbCU-71aY")

    # Initialize an empty list to store the tuples
    result = []

    for element in data['content']:
        if 'table' in element:
            table_rows = element['table']['tableRows']
            for row in table_rows:
                # Check if the row has at least two cells
                if len(row['tableCells']) >= 2:
                    german = row['tableCells'][0]['content'][0]['paragraph']['elements'][0]['textRun']['content'].strip()
                    english = row['tableCells'][1]['content'][0]['paragraph']['elements'][0]['textRun']['content'].strip()
                    result.append((german, english))

    # Compile the data
    compiled_data = {}
    current_topic = None

    for item in result:
        if item[0] == "SEPARATOR":
            current_topic = item[1]
            compiled_data[current_topic] = []
        else:
            if item != ("German", "English"):
                compiled_data[current_topic].append((item[0], item[1]))

    return compiled_data


data = compile_data()
