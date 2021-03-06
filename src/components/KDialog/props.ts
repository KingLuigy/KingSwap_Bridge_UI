export interface Props {
  open: boolean;
  title: string;
  onClose(): void;
  content?: React.ReactNode;
}
