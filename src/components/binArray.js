export default function binArray(inputLineData) {
    /* Input: lineData, as from this.state.lineData
    First computes an array of 1-year returns, then computes all
    possible 1 year returns, and returns an array of objects to be
    rendered in a bar chart.
    Only works for Monthly time-series!
    */

    let returnsArray = [] //array of 1-year returns

    for (let i=0; i < inputLineData.length; i++) {
        let currentYear = +inputLineData[i].date.split("-")[0]
        let currentMth = +inputLineData[i].date.split("-")[1]
        let currentVal = +inputLineData[i].a
        let j = i+1
        if (j < inputLineData.length) {
            for (let j=i+1; j < inputLineData.length; j++) {
                let nextYear = +inputLineData[j].date.split("-")[0]
                let nextMonth = +inputLineData[j].date.split("-")[1]
                if (nextYear === currentYear+1 && nextMonth === currentMth) {
                    let nextVal = +inputLineData[j].a
                    let annualReturn = (nextVal - currentVal)/currentVal
                    returnsArray.push(annualReturn)
                }
            }
        }
    }
    //console.log(returnsArray)

    const maxReturns = Math.max.apply(null, returnsArray)
    const minReturns = Math.min.apply(null, returnsArray)
    const returnRange = maxReturns - minReturns
    const intervalWidth = 0.01
    const numIntervals = Math.floor(returnRange/intervalWidth) + 1

    let binCountsArray = []
    for (let i = 0; i < numIntervals; i++) {
        let leftInterval = minReturns + (intervalWidth*i)
        let rightInterval = leftInterval + intervalWidth
        let binCounts = 0
        for (let j = 0; j < returnsArray.length; j++) {
            if ((returnsArray[j] >= leftInterval) && (returnsArray[j] < rightInterval)) {
                binCounts = binCounts+1
            }
        }
        let newRow = {"interval":leftInterval.toFixed(2), 
        "frequency": binCounts}

        binCountsArray.push(newRow)
    }

    console.log(minReturns, maxReturns)
    console.log(numIntervals)
    console.log(returnsArray.length)
    console.log(binCountsArray)

    return binCountsArray
}