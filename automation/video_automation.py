from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time

BRAVE_PATH = r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"
CHROMEDRIVER_PATH = r"D:\watchwildlifedashboardbb\driver\chromedriver-win64\chromedriver-win64\chromedriver.exe"
VIDEO_PAGE = r"file:///D:/watchwildlifedashboardbb/automation/videos/player.html"

print("Opening wildlife video...")

options = Options()
options.binary_location = BRAVE_PATH
options.add_argument("--start-maximized")

service = Service(CHROMEDRIVER_PATH)
driver = webdriver.Chrome(service=service, options=options)

driver.get(VIDEO_PAGE)

time.sleep(5)

print("Playing video...")
driver.execute_script("document.getElementById('wildVideo').play();")

time.sleep(30)
driver.quit()

print("Video automation completed")
