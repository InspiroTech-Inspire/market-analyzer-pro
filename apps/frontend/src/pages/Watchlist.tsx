import WatchlistPanel from '@/components/dashboard/WatchlistPanel';

function Watchlist() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Watchlist</h1>
        <p className="text-muted-foreground">Monitor your favorite symbols</p>
      </div>
      <WatchlistPanel />
    </div>
  );
}

export default Watchlist;