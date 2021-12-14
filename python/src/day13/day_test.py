from .day import part1
from utils import getSampleInput, getInput


def test_part1_sample():
    input = getSampleInput(__file__)
    assert part1(input) == 17


def test_part1_input():
    input = getInput(__file__)
    assert part1(input) == 671

# use run.py to generate output for part2
