import pyautogui
import sys 

arguments = sys.argv

episodeSelectorLabel = pyautogui.locateOnScreen('./screenshots/animego_selectEpisode.png', confidence=0.6)
episodeSelectorLabelPoint = pyautogui.center(episodeSelectorLabel)

episodeSelectorLabelPointX, episodeSelectorLabelPointY = episodeSelectorLabelPoint

pyautogui.doubleClick(episodeSelectorLabelPointX, episodeSelectorLabelPointY)

pyautogui.write(arguments[1])
pyautogui.press(['enter'])
