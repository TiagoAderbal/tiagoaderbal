import SystemAlert from "./SystemAlert";

export default function PaywallOverlay({ onDismiss }) {
  return (
    <div className="paywall-overlay">
      <SystemAlert type="PAYWALL" onDismiss={onDismiss} />
    </div>
  );
}
