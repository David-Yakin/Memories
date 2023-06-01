interface MemoryInterface {
  _id: string;
  title: string;
  message: string;
  creator: string;
  tags: string[];
  selectedFile: String;
  likes: number;
  createdAt: Date;
}

export default MemoryInterface;
