def read_input(input):
    pointIndices = []
    folds = []

    readingFolds = False
    for line in input:
        if line.isspace():
            readingFolds = True
            continue

        if not readingFolds:
            pointIndices.append([int(n) for n in line.split(',')])
        else:
            foldAxis = line.split('fold along ')[1].split('=')[0]
            axisValue = line.split('fold along ')[1].split('=')[1].strip()
            folds.append({
                "foldAxis": foldAxis,
                "axisValue": int(axisValue),
            })
    return pointIndices, folds


def populate_paper(pointIndices):
    paper = [[0]*2000 for _ in range(2000)]

    for point in pointIndices:
        paper[point[1]][point[0]] = 1

    return paper


def count_paper_points(paper):
    count = 0
    for line in paper:
        count += line.count(1)
    return count


def fold_paper(paper, fold):
    folded_paper = [[0]*2000 for _ in range(2000)]

    if (fold['foldAxis'] == 'x'):
        for yIndex in range(0, len(paper)):
            for xIndex in range(0, fold['axisValue']+1):
                folded_paper[yIndex][xIndex] = paper[yIndex][xIndex]
        for yIndex in range(0, len(paper)):
            for xIndex in range(fold['axisValue']+1, len(paper[0])):
                horizontal_distance_from_axis = xIndex - fold['axisValue']
                new_x_position =\
                    fold['axisValue'] - horizontal_distance_from_axis
                if folded_paper[yIndex][new_x_position] == 0:
                    folded_paper[yIndex][new_x_position] =\
                        paper[yIndex][xIndex]

    if (fold['foldAxis'] == 'y'):
        for yIndex in range(0, fold['axisValue']+1):
            for xIndex in range(0, len(paper[0])):
                folded_paper[yIndex][xIndex] = paper[yIndex][xIndex]

        for yIndex in range(fold['axisValue']+1, len(paper)):
            for xIndex in range(0, len(paper[0])):
                vertical_distance_from_axis = yIndex - fold['axisValue']
                new_y_position =\
                    fold['axisValue'] - vertical_distance_from_axis
                if folded_paper[new_y_position][xIndex] == 0:
                    folded_paper[new_y_position][xIndex] =\
                        paper[yIndex][xIndex]

    return folded_paper


def format_paper(paper):
    result = ''

    for yIndex in range(0, 20):
        for xIndex in range(0, 100):
            if paper[yIndex][xIndex] == 0:
                result += ' '
            else:
                result += 'X'
        result += '\n'

    return result


def part1(input):
    pointIndices, folds = read_input(input)
    paper = populate_paper(pointIndices)

    paper = fold_paper(paper, folds[0])

    result = count_paper_points(paper)

    formatted_paper = format_paper(paper)
    print(formatted_paper)

    return result


def part2(input):
    pointIndices, folds = read_input(input)
    paper = populate_paper(pointIndices)

    for fold in folds:
        paper = fold_paper(paper, fold)

    return format_paper(paper)
