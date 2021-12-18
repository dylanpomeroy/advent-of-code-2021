from .day import part1, part2
from utils import getSampleInput, getInput


def test_part1_sample():
    input = getSampleInput(__file__)
    assert part1(input) == 10


def test_part1_input():
    input = getInput(__file__)
    assert part1(input) == 3410


def test_part2_sample():
    input = getSampleInput(__file__)
    assert part2(input) == 36


def test_part2_input():
    input = getInput(__file__)
    assert part2(input) == 98796
