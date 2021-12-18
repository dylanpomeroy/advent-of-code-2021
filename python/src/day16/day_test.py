from .day import part1, part2
from utils import getSampleInput, getInput


def test_part1_sample():
    input = getSampleInput(__file__)
    assert part1(input) == 16


def test_part1_input():
    input = getInput(__file__)
    assert part1(input) == 0
