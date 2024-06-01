import { formatDate } from "@/lib/utils";
import AddStepDialog from "./add-step-dialog";
import { Separator } from "./ui/separator";

type timelineProps = {
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const Timeline = ({
  timelineData,
  id,
  currentStatus,
}: {
  timelineData: timelineProps[];
  id: string;
  currentStatus: string;
}) => {
  return (
    <div className="w-full col-start-1 col-span-2 pr-4">
      <div className="flex gap-4 items-center mb-8">
        <h1 className="text-lg font-semibold">Progress</h1>
        <AddStepDialog id={id} currentStatus={currentStatus} />
      </div>
      <div className="relative pl-9 ml-4 w-full justify-items-start col-start-1 h-fit border-l">
        {timelineData.reverse().map((item, index) => (
          <div
            key={index}
            className="flex mb-8 last:mb-0"
            data-counter={timelineData.length - index}
          >
            <div>
              <h1 className={`font-medium text-lg`}>{item.title}</h1>
              {item.description && (
                <div className="order-1 w-[416px] mt-3">
                  <h3 className="mb-1 text-muted-foreground">
                    {item.description}
                  </h3>
                  {(item.createdAt || item.updatedAt) && (
                    <div className="flex items-center gap-2 mt-4 h-full">
                      {item.createdAt && (
                        <span className="text-xs text-muted-foreground">
                          Created: {formatDate(item.createdAt)}
                        </span>
                      )}
                      <Separator orientation="vertical" className="h-3 mx-1" />
                      {item.updatedAt && (
                        <span className="text-xs text-muted-foreground">
                          Updated: {formatDate(item.updatedAt)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
