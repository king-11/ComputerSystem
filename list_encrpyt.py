from csv import DictReader, DictWriter, writer
from vignere_crypt import final_result

with open('Merge.csv', newline='') as file:
    with open('Final.csv', 'w', newline="") as final:
        reader = DictReader(file)
        writer = DictWriter(final, fieldnames=[
                            'Name', 'Roll Number', 'DOB', 'Hash'])
        writer.writeheader()

        for row in reader:
            dob = row['Date of Birth']
            dob = dob.split("/")
            dob = ['{:02d}'.format(int(x)) for x in dob]
            dob[0], dob[1] = dob[1], dob[0]
            roll_number = row['Roll Number']
            final = '{}'.format(final_result(roll_number, dob))

            dob[0], dob[1] = dob[1], dob[0]

            writer.writerow({"Name": row['Name'], "DOB": "/".join(dob),
                             "Roll Number": row['Roll Number'], "Hash": final})
