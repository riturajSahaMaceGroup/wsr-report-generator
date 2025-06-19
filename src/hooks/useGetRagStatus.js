import { useMemo } from 'react';
import { useSelector } from 'react-redux';

/**
 * Hook to get RAG status for a given metric name.
 * @param {'cost' | 'usage' | 'dataIngestion'} statusOf
 * @returns {'R' | 'A' | 'G' | null}
 */
const useGetRagStatus = (statusOf) => {
    // Simulated internal data source
    const value = useSelector((state)=> state.mForm)
    const metrics = {
        cost: value.cost,
        usage: value.usage.week_0["Avg. Response Time"].split(" ")[0],
        dataIngestion: parseFloat(value.ingestion[2].value.match(/[\d.]+/)[0]),
    };

    return useMemo(() => {
        const value = metrics[statusOf];

        if (value === undefined) return null;

        switch (statusOf) {
            case 'cost':
                const mCal = value.spent / value.budget * 100;
                console.log("mCal: ",mCal)
               
                return  mCal <= 70 ? "G" : mCal > 70 && mCal <= 80 ? "A" : "R";

            case 'usage':
                if (value > 3) return 'R';
                if (value > 2) return 'A';
                return 'G';

            case 'dataIngestion':
                if (value <= 97) return 'R';
                if (value < 99) return 'A';
                return 'G';

            default:
                return null;
        }
    }, [value]);
};

export default useGetRagStatus;
