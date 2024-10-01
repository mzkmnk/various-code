import { useEffect, useState } from "react"
import { Observable } from "rxjs";

export const useObservable = <T>(observable$:Observable<T>,initialValue:T) => {
    const [value,setValue] = useState<T>(initialValue);

    useEffect(() => {
        const subscription = observable$.subscribe(setValue);

        console.log('subscription',subscription);

        return () => {
            subscription.unsubscribe();
        }
    },[observable$]);

    return value;
}