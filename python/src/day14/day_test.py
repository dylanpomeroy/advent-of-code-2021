from .day import part1, part2
from utils import getSampleInput, getInput


def test_part1_sample():
    input = getSampleInput(__file__)
    assert part1(input) == 1588


def test_part1_input():
    input = getInput(__file__)
    assert part1(input) == 3408


def test_part2_sample():
    input = getSampleInput(__file__)
    assert part2(input) == 2188189693529


def test_part2_input():
    input = getInput(__file__)
    assert part2(input) == 3724343376942
