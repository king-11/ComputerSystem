from pathlib import Path
print('Running' if __name__ == '__main__' else 'Importing', Path(__file__).resolve())

from csv import DictReader, DictWriter
import random

with open('Final.csv', 'r', newline="") as file:
    reader = DictReader(file)
    arr = [x for x in reader]

    shuffle1 = random.sample(arr, len(arr))
    shuffle2 = random.sample(arr, len(arr))
    shuffle3 = random.sample(arr, len(arr))

    for x1, x2, x3, y in zip(shuffle1, shuffle2, shuffle3, arr):
        if y['Roll Number'] in (x1['Roll Number'], x2['Roll Number'], x3['Roll Number']):
            print(x1, x2, x3, y)
            print("not working")
            exit(1)

    with open('random.csv', 'w+') as file1:
        writer = DictWriter(file1, fieldnames=[
                            'Name', 'Roll Number', 'Hash', 'Check 1', 'Check 1 Roll', 'Check 1 Hash', 'Check 2', 'Check 2 Roll', 'Check 2 Hash', 'Check 3', 'Check 3 Roll', 'Check 3 Hash'])
        writer.writeheader()
        for x1, x2, x3, y in zip(shuffle1, shuffle2, shuffle3, arr):
            row = {
                'Name': y['Name'], 'Roll Number': y['Roll Number'], 'Hash': y['Hash'], 'Check 1': x1['Name'], 'Check 1 Roll': x1['Roll Number'], 'Check 1 Hash': x1['Hash'], 'Check 2': x2['Name'], 'Check 2 Roll': x2['Roll Number'], 'Check 2 Hash': x2['Hash'], 'Check 3': x3['Name'], 'Check 3 Roll': x3['Roll Number'], 'Check 3 Hash': x3['Hash']
            }
            writer.writerow(row)
