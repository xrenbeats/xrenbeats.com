import tkinter as tk
from tkinter import ttk
import random

# ------------------------
# DATA
# ------------------------

scales = {
    "C Major": ['C','D','E','F','G','A','B'],
    "A Minor": ['A','B','C','D','E','F','G']
}

chords = {
    "C": ["C","E","G"],
    "Dm": ["D","F","A"],
    "Em": ["E","G","B"],
    "F": ["F","A","C"],
    "G": ["G","B","D"],
    "Am": ["A","C","E"]
}

playlist = []

# ------------------------
# MELODY GENERATOR
# ------------------------

def generate_melody():
    scale = scales[scale_var.get()]
    melody_box.delete(0, tk.END)

    for _ in range(8):
        note = random.choice(scale)
        melody_box.insert(tk.END, note)

# ------------------------
# AI MELODY
# ------------------------

def ai_melody():
    scale = scales[scale_var.get()]
    melody_box.delete(0, tk.END)

    note = random.choice(scale)

    for _ in range(12):
        step = random.choice([-1, 0, 1])
        idx = (scale.index(note) + step) % len(scale)
        note = scale[idx]
        melody_box.insert(tk.END, note)

# ------------------------
# CHORDS
# ------------------------

def generate_chords():
    chord_box.delete(0, tk.END)

    for _ in range(4):
        c = random.choice(list(chords.keys()))
        chord_box.insert(tk.END, c)

# ------------------------
# SCALE
# ------------------------

def show_scale():
    scale_box.delete(0, tk.END)

    for note in scales[scale_var.get()]:
        scale_box.insert(tk.END, note)

# ------------------------
# DRUMS
# ------------------------

def generate_drums():
    drum_box.delete(0, tk.END)

    for _ in range(16):
        step = random.choice(["Kick","Snare","Hat","-"])
        drum_box.insert(tk.END, step)

# ------------------------
# PLAYLIST
# ------------------------

def add_to_playlist():
    for item in melody_box.get(0, tk.END):
        playlist.append(item)
        playlist_box.insert(tk.END, item)

# ------------------------
# CLEAR
# ------------------------

def clear_all():
    melody_box.delete(0, tk.END)
    chord_box.delete(0, tk.END)
    scale_box.delete(0, tk.END)
    drum_box.delete(0, tk.END)

# ------------------------
# GUI
# ------------------------

root = tk.Tk()
root.title("Simple Music Workstation")
root.geometry("500x600")

tabs = ttk.Notebook(root)

tab1 = ttk.Frame(tabs)
tab2 = ttk.Frame(tabs)
tab3 = ttk.Frame(tabs)

tabs.add(tab1, text="Melody")
tabs.add(tab2, text="Drums")
tabs.add(tab3, text="Playlist")

tabs.pack(expand=1, fill="both")

# ------------------------
# Melody Tab
# ------------------------

scale_var = tk.StringVar(value="C Major")

tk.Label(tab1, text="Scale").pack()
ttk.Combobox(tab1, textvariable=scale_var, values=list(scales.keys())).pack()

melody_box = tk.Listbox(tab1)
melody_box.pack()

tk.Button(tab1, text="Generate Melody", command=generate_melody).pack()
tk.Button(tab1, text="AI Melody", command=ai_melody).pack()

chord_box = tk.Listbox(tab1)
chord_box.pack()

tk.Button(tab1, text="Generate Chords", command=generate_chords).pack()

scale_box = tk.Listbox(tab1)
scale_box.pack()

tk.Button(tab1, text="Show Scale", command=show_scale).pack()

tk.Button(tab1, text="Add To Playlist", command=add_to_playlist).pack()

tk.Button(tab1, text="Clear", command=clear_all).pack()

# ------------------------
# Drum Tab
# ------------------------

drum_box = tk.Listbox(tab2)
drum_box.pack()

tk.Button(tab2, text="Generate Drum Pattern", command=generate_drums).pack()

# ------------------------
# Playlist Tab
# ------------------------

playlist_box = tk.Listbox(tab3)
playlist_box.pack()

# ------------------------
# RUN
# ------------------------

root.mainloop()
