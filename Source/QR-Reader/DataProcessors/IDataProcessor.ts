interface IDataProcessor {
    dataType: DataType;
    process: (data: string) => void;
}