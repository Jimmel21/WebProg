first_names = ['Tevin', 'Jimmel', 'Matthew', 'John', 'Jane']
last_names = ['Achong', 'Greer', 'Forbes', 'Doe', 'Johnson']

def merge(el1, el2):
    return el1 + ' ' + el2

def mergeHandler(arr1, arr2, func):
    return list(map(lambda x, y : func(x, y), arr1, arr2))

def merge2Single(arr1, arr2):
    return mergeHandler(arr1, arr2, merge)

def merge2Object(arr1, arr2):
    #names = mergeHandler(arr1, arr2, merge)
    objectList = []
    
    for i in range(len(arr1)):
        objHolder = {}
        objHolder['firstname'] = arr1[i]
        objHolder['lastname'] = arr2[i]
        objectList.append(objHolder)
    
    return objectList

print(merge2Object(first_names, last_names))
