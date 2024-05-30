import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { summaryCard } from "@/lib/definitions";

const SummaryCard = ({
  cardTitle,
  cardIcon,
  cardContentTitle,
  cardContentSubTitle,
}: summaryCard) => {
  const CardIcon = cardIcon;
  return (
    <Card>
      <CardHeader className="flex items-start flex-row justify-between space-y-0 pb-2">
        <CardTitle className="font-medium capitalize text-sm">
          {cardTitle}
        </CardTitle>
        {cardIcon && <CardIcon className="w-4 h-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <h2 className="font-bold text-2xl">{cardContentTitle}</h2>
        <span className="text-muted-foreground text-xs">
          {cardContentSubTitle}
        </span>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
