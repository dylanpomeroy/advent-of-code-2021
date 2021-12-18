def hexadecimal_to_binary(input):
    hex_to_bin = {
        "0": "0000",
        "1": "0001",
        "2": "0010",
        "3": "0011",
        "4": "0100",
        "5": "0101",
        "6": "0110",
        "7": "0111",
        "8": "1000",
        "9": "1001",
        "A": "1010",
        "B": "1011",
        "C": "1100",
        "D": "1101",
        "E": "1110",
        "F": "1111",
    }

    return ''.join([hex_to_bin[char] for char in input])


class Packet:
    pass


def form_packet_heirarchy(binary, cutoff_at_packet_count=None):
        packets = []
        for i in range(0, len(binary)):
            packet = Packet()
            packet.version = int(binary[i:i+3], 2)
            i += 3
            packet.type_id = int(binary[i:i+3], 2)
            if packet.type_id == 4:  # literal
                bit_groups = []
                curr_bit_group = binary[i:i+5]
                i += 5
                while (curr_bit_group.startswith('1')):
                    bit_groups.append(curr_bit_group)
                    curr_bit_group = binary[i:i+5]
                    i += 5
                bit_groups.append(curr_bit_group)  # starts with 0

                binary_literal = ''.join([group[1:] for group in bit_groups])
                packet.literal = int(binary_literal, 2)
            else:  # operator
                length_id_type = binary[i]
                if length_id_type == '0':
                    packet.total_length_of_subpackets = int(binary[i:i+15], 2)
                    i += 15
                    packet.subpackets = form_packet_heirarchy(binary[i:i+packet.total_length_of_subpackets])
                else:
                    packet.num_subpackets_contained = int(binary[i:i+11], 2)
                    i += 11
                    packet.subpackets = form_packet_heirarchy(binary[i:], cutoff_at_packet_count=packet.num_subpackets_contained)
            packets.append(packet)
            if cutoff_at_packet_count == len(packets):
                break

        return packets


def part1(input):
    binary = hexadecimal_to_binary(input[0])
    packet_heirarchy = form_packet_heirarchy(binary)

    return 0

def part2(input):
    return len(input)
