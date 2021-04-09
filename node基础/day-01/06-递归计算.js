function sum(a, b) {
    var sum1 = 0;
    if (b == 0) return a;
    sum1 += sum(a, b - 1);

    console.log(sum1);
}

sum(4, 2)