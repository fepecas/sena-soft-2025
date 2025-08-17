import pdfplumber

def extraer_texto(pdf_path):
    texto = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            texto += page.extract_text() + "\n"
    return texto.lower()
