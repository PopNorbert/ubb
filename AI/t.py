import numpy as np

def spinner(listNumbers):
    n = len(listNumbers)
    listProb = np.empty(n)
    for i in range(n):
        listProb[i] = listNumbers[i]/360
    return np.random.choice(n, p=listProb)

a = np.array([45,85,70,160])
print(spinner(a))

def balls(lplane, rball, rhole):
    if rball>rhole:
        print(0)
    elif rball==rhole:
        print(1.0/10000)
    else:
        good=0
        for _ in range(10000):
            dist = lplane/2
            x,y = np.random.uniform(-dist, dist), np.random.uniform(-dist,dist)
            if x**2+y**2<=rhole**2:
                good+=1
        print("mathematically deduced:", np.pi*rhole**2/lplane**2)
        print("monte carlo trial: ", good/10000)

balls(100,1,30)