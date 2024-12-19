import streamlit as st
import streamlit.components.v1 as components

# Load the HTML content from your file
with open("index.html", "r") as html_file:
    html_content = html_file.read()

# Render the HTML in Streamlit
st.title("To-Do App")
components.html(html_content, height=800, scrolling=True)
