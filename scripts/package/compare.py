from csv import DictReader
from types import LambdaType

with open('./submit.csv') as submitted:
  with open('./Final.csv') as stored:
    reader1 = DictReader(stored)
    reader2 = DictReader(submitted)

    list_submit = list(sorted(reader2,key=lambda student: student['Hash']))
    list_stored = list(sorted(reader1,key=lambda student: student['Hash']))

    for x,y in zip(list_submit,list_stored):
      if(x['Hash'] != y['Hash']):
        print(y['Name'],y['Hash'],x['Hash'])
        exit(1)
