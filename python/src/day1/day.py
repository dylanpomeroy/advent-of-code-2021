def part1(input):
    inputList = [int(i) for i in input]

    result = 0
    last = inputList[0]
    for num in inputList:
        if num > last:
            result += 1
        last = num

    return result


def part2(input):
    return len(input)
