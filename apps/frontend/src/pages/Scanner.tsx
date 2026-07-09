import ScannerPanel from '@/components/analysis/ScannerPanel';

function Scanner() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Market Scanner</h1>
        <p className="text-muted-foreground">Scan and filter symbols by technical signals</p>
      </div>
      <ScannerPanel />
    </div>
  );
}

export default Scanner;