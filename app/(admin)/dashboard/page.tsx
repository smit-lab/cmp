import Chart from "@/components/chart";
import PageHeader from "@/components/page-header";
import SummaryCard from "@/components/summary-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { fetchDashboardData } from "@/lib/data";
import { summaryCard } from "@/lib/definitions";

import { formatCurrency } from "@/utils/formatCurrency";

import { DollarSign, Users2 } from "lucide-react";

async function getData() {
  try {
    const data = await fetchDashboardData();

    if (!data) {
      console.error("Project not found");
      throw new Error("Project not found");
    }

    if (!data.recentPaymentsData) {
      console.error("Recent payments datas are missing");
      throw new Error("Recent payments datas are missing");
    } else if (!data.thisMonthEarningData) {
      console.error("This month earning datas are missing");
      throw new Error("This month earning datas are missing");
    } else if (!data.totalClientsCountData) {
      console.error("Total client count datas are missing");
      throw new Error("Total client count datas are missing");
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw new Error("Failed to fetch data");
  }
}

const DashboardPage = async () => {
  const fetchedData = await getData();
  const monthlyPaymets = fetchedData.monthlyEarningData;

  const chart_data = [
    {
      name: "Jan",
      monthNum: 1,
      paid: undefined,
    },
    {
      name: "Feb",
      monthNum: 2,
      paid: undefined,
    },
    {
      name: "Mar",
      monthNum: 3,
      paid: undefined,
    },
    {
      name: "Apr",
      monthNum: 4,
      paid: undefined,
    },
    {
      name: "May",
      monthNum: 5,
      paid: undefined,
    },
    {
      name: "Jun",
      monthNum: 6,
      paid: undefined,
    },
    {
      name: "Jul",
      monthNum: 7,
      paid: undefined,
    },
    {
      name: "Aug",
      monthNum: 8,
      paid: undefined,
    },
    {
      name: "Sep",
      monthNum: 9,
      paid: undefined,
    },
    {
      name: "Oct",
      monthNum: 10,
      paid: undefined,
    },
    {
      name: "Nov",
      monthNum: 11,
      paid: undefined,
    },
    {
      name: "Dec",
      monthNum: 12,
      paid: undefined,
    },
  ];
  const summary_cards_data: summaryCard[] = [
    {
      cardTitle: "Total earning (monthly)",
      cardIcon: DollarSign,
      cardContentTitle: formatCurrency(
        fetchedData.thisMonthEarningData[0].earned
      ),
      cardContentSubTitle: "+20% from last month",
    },
    {
      cardTitle: "Total earning (yearly)",
      cardIcon: DollarSign,
      cardContentTitle: formatCurrency(
        fetchedData.thisYearEarningData[0].earned
      ),
      cardContentSubTitle: "+50% from last month",
    },
    {
      cardTitle: "Total earning (all time)",
      cardIcon: DollarSign,
      cardContentTitle: formatCurrency(
        fetchedData.allTimeEarningData[0].earned
      ),
      cardContentSubTitle: "+20% from last month",
    },
    {
      cardTitle: "Total clients",
      cardIcon: Users2,
      cardContentTitle: `${fetchedData.totalClientsCountData}`,
      cardContentSubTitle: "+50% from last month",
    },
  ];

  monthlyPaymets.forEach((payment) => {
    const index = payment.monthNum - 1;
    chart_data[index] = payment;
  });

  return (
    <div className="p-4">
      <PageHeader
        pageTitle="Dashboard"
        pageDescription="This is your dashboard"
      />
      <div className="grid lg:grid-cols-4 lg:gap-4">
        {summary_cards_data.map((card, index) => (
          <SummaryCard
            key={index}
            cardTitle={card.cardTitle}
            cardIcon={card.cardIcon}
            cardContentTitle={card.cardContentTitle}
            cardContentSubTitle={card.cardContentSubTitle}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-7 lg:gap-4 w-full h-[400px]">
        <Card className="w-full h-full p-0 col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className=" pl-2">
            <Chart data={chart_data} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent payments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {fetchedData.recentPaymentsData ? (
              fetchedData.recentPaymentsData.map((payment, index) => (
                <div className="flex justify-between" key={index}>
                  <div className="text-sm">
                    <h1 className="font-medium mb-1 text-base">
                      {payment.name}
                    </h1>
                    <span className="text-muted-foreground">
                      {payment.client.email}
                    </span>
                  </div>
                  <span className="font-medium text-base">
                    {formatCurrency(payment.price)}
                  </span>
                </div>
              ))
            ) : (
              <div>No data</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
