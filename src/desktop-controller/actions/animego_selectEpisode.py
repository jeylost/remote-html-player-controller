import pyautogui
import sys 

arguments = sys.argv

pyautogui.press(['esc'])
pyautogui.press(['tab'])
pyautogui.write(arguments[1])
pyautogui.press(['enter'])
