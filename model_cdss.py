import sys
import joblib
saved_model = joblib.load('model_cdss.pkl')
b = sys.argv[1]
a = list(range(2, 134))
b = [int(x) for x in b.split()]
count = 0
while count < len(b):
    item_to_replace = b[count]
    replacement_value = 1
    indices_to_replace = [i for i, x in enumerate(a) if x == item_to_replace]
    count += 1
    for i in indices_to_replace:
        a[i] = replacement_value
a = [0 if x != 1 else x for x in a]
y_diagnosis = saved_model.predict([a])
print(y_diagnosis[0])
