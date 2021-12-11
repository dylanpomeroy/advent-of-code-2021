
from pathlib import Path


def getSampleInput(fromFilePath):
    inputFile = (Path(fromFilePath).parent / "inputs/sampleInput")
    with inputFile.open() as file:
        return file.readlines()


def getInput(fromFilePath):
    inputFile = (Path(fromFilePath).parent / "inputs/input")
    with inputFile.open() as file:
        return file.readlines()
