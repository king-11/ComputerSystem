from pathlib import Path
print('Running' if __name__ == '__main__' else 'Importing', Path(__file__).resolve())

def check_roll_number(a: str):
    if len(a) != 8:
        print("Invalid Roll Number")
        exit(1)
    try:
        b = int(a)
    except ValueError:
        print("Invalid Roll Number")
        exit(5)

    if b not in range(19075001, 19075093) and b not in range(19074001, 19074033) and b not in range(19124001, 19124049) and b != 15123002:
        print("Invalid Roll Number")
        exit(2)

    return b


def check_dob(date_of_birth: list):
    try:
        dob_array = "".join(date_of_birth)
        dob_array = [int(x) for x in dob_array]
    except ValueError:
        print("Invalid DOB format should be dd/mm/yyyy")
        exit(3)

    return dob_array


def hash_roll_number(roll_number_val: int):

    roll_number_val = roll_number_val*10 + roll_number_val % 10
    roll_number = [int(x) for x in str(roll_number_val)]
    roll_number[2] = 1
    roll_number.reverse()
    roll_number_matrix = []
    for x in range(3):
        current = []
        for y in range(x*3, x*3+3):
            current.append(roll_number[y])
        roll_number_matrix.append(current)

    result_matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    key = [[1, 2, 3], [0, 1, 4], [5, 6, 7]]
    for i in range(len(roll_number_matrix)):
        for j in range(len(key[0])):
            for k in range(len(key)):
                result_matrix[i][j] = int(roll_number_matrix[i][k]) + key[k][j]

    result_matrix = [j for i in result_matrix for j in i]
    return result_matrix


def vigenere_cipher(a: list, b: list):
    ciphered = str()
    for x, y in zip(a, b):
        ciphered += '{:02d}'.format(x+y)
    return ciphered


def final_result(roll_number: str, date_of_birth: list):
    roll_number_val = check_roll_number(roll_number)
    date_of_birth = check_dob(date_of_birth)
    result_matrix = hash_roll_number(roll_number_val)

    return vigenere_cipher(result_matrix, date_of_birth)
