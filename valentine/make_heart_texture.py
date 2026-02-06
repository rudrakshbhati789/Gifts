import numpy as np
import matplotlib.pyplot as plt

# Heart equation
t = np.linspace(0, 2*np.pi, 1000)
x = 16 * np.sin(t)**3
y = (13 * np.cos(t) - 5 * np.cos(2*t)
     - 2 * np.cos(3*t) - np.cos(4*t))

plt.figure(figsize=(4,4), dpi=300)
plt.plot(x, y, color='#ff8fa3', linewidth=4)
plt.fill(x, y, '#ffb3c1', alpha=0.9)
plt.axis('off')
plt.savefig('heart_texture.png', transparent=True)
plt.close()