import json
import matplotlib.pyplot as plt
from matplotlib.path import Path
from matplotlib.patches import PathPatch

# python 3.8.13
# matplotlib 3.4.3

def display_geojson(content):
    """
    Display a GeoJSON content.

    Parameters:
        content (dict): The GeoJSON content as a dictionary.
    """
    fig, ax = plt.subplots()
    for feature in content["features"]:
        for coords in feature["geometry"]["coordinates"]:
            path = Path(coords)
            patch = PathPatch(path, edgecolor='r', facecolor='none')
            ax.add_patch(patch)
    ax.set_aspect('equal', 'box')
    ax.autoscale()
    plt.show()

# Example usage:
file_path = "cities/istanbul.geojson"
with open(file_path, "r") as fl:
    content = json.load(fl)
    display_geojson(content)
