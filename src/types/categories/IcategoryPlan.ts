export default interface IcategoryPlan {
  title: string;
  limit: number;
  id: string;
  progressPercent: number;
  progressColor: string;
  spend: number;
  tooltip?: string;
}
