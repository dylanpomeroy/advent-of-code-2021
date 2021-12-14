def read_input(input):
    polymer = input[0].strip()

    pair_insertion_rules = {}
    for index in range(2, len(input)):
        pair = input[index].split(' -> ')[0]
        insertion = input[index].split(' -> ')[1].strip()
        pair_insertion_rules[pair] = insertion

    return polymer, pair_insertion_rules


def part1(input):
    polymer, pair_insertion_rules = read_input(input)

    next_polymer = ''
    for _ in range(0, 10):
        for index in range(0, len(polymer)-1):
            next_polymer += polymer[index]
            next_polymer +=\
                pair_insertion_rules[polymer[index] + polymer[index+1]]
        next_polymer += polymer[-1]
        polymer = next_polymer
        next_polymer = ''

    charCounts = {}
    for char in polymer:
        charCounts[char] = charCounts[char] + 1 if char in charCounts else 1

    highestCharCount = 0
    lowestCharCount = 1000000
    for char, count in charCounts.items():
        if count > highestCharCount:
            highestCharCount = count
        if count < lowestCharCount:
            lowestCharCount = count

    return highestCharCount - lowestCharCount


def part2(input):
    polymer, pair_insertion_rules = read_input(input)

    polymer_pair_counts = {}
    for index in range(0, len(polymer)-1):
        pair = polymer[index] + polymer[index+1]
        polymer_pair_counts[pair] =\
            polymer_pair_counts[pair] + 1 if pair in polymer_pair_counts else 1

    next_polymer_pair_counts = {}
    for step in range(0, 40):
        print('on step ', step)
        for pair, count in polymer_pair_counts.items():
            insertion = pair_insertion_rules[pair]
            new_pair_1 = pair[0] + insertion
            next_polymer_pair_counts[new_pair_1] =\
                next_polymer_pair_counts[new_pair_1] + count \
                if new_pair_1 in next_polymer_pair_counts else count
            new_pair_2 = insertion + pair[1]
            next_polymer_pair_counts[new_pair_2] =\
                next_polymer_pair_counts[new_pair_2] + count \
                if new_pair_2 in next_polymer_pair_counts else count
        polymer_pair_counts = next_polymer_pair_counts
        next_polymer_pair_counts = {}

    charCounts = {}
    for pair, count in polymer_pair_counts.items():
        charCounts[pair[0]] =\
            charCounts[pair[0]] + count if pair[0] in charCounts else count
    charCounts[polymer[-1]] =\
        charCounts[polymer[-1]] + 1 if polymer[-1] in charCounts else 1

    highestCharCount = 0
    lowestCharCount = 1000000000000000000000000
    for _, count in charCounts.items():
        if count > highestCharCount:
            highestCharCount = count
        if count < lowestCharCount:
            lowestCharCount = count

    print('result ', highestCharCount - lowestCharCount)
    return highestCharCount - lowestCharCount
