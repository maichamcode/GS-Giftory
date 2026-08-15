import { LoadingCards } from "@/components/shared/states";

export default function OrdersLoading() {
  return <div className="container-shell py-20"><LoadingCards count={3} /></div>;
}
