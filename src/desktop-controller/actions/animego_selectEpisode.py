import pyautogui
import sys 

arguments = sys.argv

episodeSelectorLabel = pyautogui.locateOnScreen('./screenshots/animego_selectEpisode.png', confidence=0.7)
episodeSelectorLabelPoint = pyautogui.center(episodeSelectorLabel)
print(episodeSelectorLabelPoint)

episodeSelectorLabelPointX, episodeSelectorLabelPointY = episodeSelectorLabelPoint

pyautogui.doubleClick(episodeSelectorLabelPointX, episodeSelectorLabelPointY)

pyautogui.write(arguments[1])
pyautogui.press(['enter'])
