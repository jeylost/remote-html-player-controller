import pyautogui
import sys 

arguments = sys.argv

episodeSelectorLabel = pyautogui.locateOnScreen('./screenshots/animego_selectEpisode.png')
episodeSelectorLabelPoint = pyautogui.center(episodeSelectorLabel)
episodeSelectorLabelPointX, episodeSelectorLabelPointY = button7point

pyautogui.click(episodeSelectorLabelPointX + 20, episodeSelectorLabelPointY)

pyautogui.write(arguments[1])
pyautogui.press(['enter'])
