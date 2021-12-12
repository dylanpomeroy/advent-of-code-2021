class Cave:
    def __init__(self, name: str, isBig: bool, paths):
        self.name = name
        self.isBig = isBig
        self.paths = paths

    def addPath(self, path):
        self.paths.append(path)

    def __str__(self):
        return self.name


def build_map(input):
    caves = {}

    for inputLine in input:
        caveNames = list(map(lambda name: name.strip(), inputLine.split('-')))
        if (not caveNames[0] in caves):
            caves[caveNames[0]] = Cave(
                name=caveNames[0], isBig=caveNames[0].isupper(), paths=[])
        if (not caveNames[1] in caves):
            caves[caveNames[1]] = Cave(
                name=caveNames[1], isBig=caveNames[1].isupper(), paths=[])

        caves[caveNames[0]].addPath(caves[caveNames[1]])
        caves[caveNames[1]].addPath(caves[caveNames[0]])

    return caves


paths_found = []


def find_paths(cave_map, can_visit_a_small_cave_twice=False):
    global paths_found

    def traverse_cave(cave_map, from_cave, current_path):
        this_current_path = current_path.copy()
        global paths_found
        if from_cave.name == 'end':
            this_current_path.append('end')
            paths_found.append(this_current_path)
            return

        this_current_path.append(from_cave.name)

        already_visited_small_caves = list(
            filter(lambda cave_name: not cave_name.isupper(),
                   this_current_path))

        def current_path_visited_small_cave_twice(current_path):
            for cave_name in current_path:
                if cave_name.isupper():
                    continue
                if current_path.count(cave_name) > 1:
                    return True
            return False

        for path in from_cave.paths:
            if path.name == 'start':
                continue
            if path.name not in already_visited_small_caves:
                traverse_cave(cave_map, path, this_current_path)
            elif can_visit_a_small_cave_twice and not\
                    current_path_visited_small_cave_twice(this_current_path):
                traverse_cave(cave_map, path, this_current_path)

    traverse_cave(cave_map, cave_map['start'], [])

    result = paths_found
    paths_found = []
    return result


def part1(input):
    cave_map = build_map(input)
    paths_found = find_paths(cave_map)
    return len(paths_found)


def part2(input):
    cave_map = build_map(input)
    paths_found = find_paths(cave_map, can_visit_a_small_cave_twice=True)
    return len(paths_found)
