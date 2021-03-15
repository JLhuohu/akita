import { defer, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from './store';

export function setLoadingAndError(store: Store) {
  return function <T>(source: Observable<T>) {
    return defer(() => {
      store.setLoading(true);
      store.setError(null);

      return source.pipe(
        tap({
          error(err) {
            store.setLoading(false);
            store.setError(err);
          },
          complete() {
            store.setLoading(false);
          },
        })
      );
    });
  };
}
