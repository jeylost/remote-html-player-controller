import pyautogui

# Get the screen size
screen_width, screen_height = pyautogui.size()

# Calculate the center coordinates
center_x = screen_width // 2
center_y = screen_height // 2

# Move the mouse to the center of the screen and click
pyautogui.moveTo(center_x, center_y)
pyautogui.click()
