import React, { useState } from "react";
import { Container, VStack, HStack, Button, Select, Input, Table, Thead, Tbody, Tr, Th, Td, Checkbox, IconButton } from "@chakra-ui/react";
import { FaPlus, FaFilter } from "react-icons/fa";

const metrics = {
  "Current Statistics": ["Price", "Volume", "Market Cap"],
  "TTM Data": ["Revenue", "Net Income", "EPS"],
  "Annual Data": ["Revenue Growth", "Net Income Growth", "EPS Growth"],
};

const initialStocks = [
  { symbol: "AAPL", price: 150, volume: 100000, marketCap: 2000000, revenue: 300000, netIncome: 50000, eps: 3.5, revenueGrowth: 5, netIncomeGrowth: 4, epsGrowth: 3 },
  { symbol: "GOOGL", price: 2800, volume: 200000, marketCap: 1500000, revenue: 400000, netIncome: 60000, eps: 4.5, revenueGrowth: 6, netIncomeGrowth: 5, epsGrowth: 4 },
  // Add more stock data here
];

const Index = () => {
  const [filters, setFilters] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState(["symbol", "price", "volume", "marketCap"]);
  const [stocks, setStocks] = useState(initialStocks);

  const addFilter = () => {
    setFilters([...filters, { category: "", metric: "", min: "", max: "" }]);
  };

  const updateFilter = (index, key, value) => {
    const newFilters = [...filters];
    newFilters[index][key] = value;
    setFilters(newFilters);
  };

  const applyFilters = () => {
    // Implement filter logic here
  };

  const toggleColumn = (column) => {
    setSelectedColumns((prev) => (prev.includes(column) ? prev.filter((c) => c !== column) : [...prev, column]));
  };

  return (
    <Container maxW="container.xl" py={4}>
      <VStack spacing={4} align="stretch">
        <HStack spacing={4}>
          <Button leftIcon={<FaPlus />} onClick={addFilter}>
            Add Filter
          </Button>
          <Button leftIcon={<FaFilter />} onClick={applyFilters}>
            Apply Filters
          </Button>
        </HStack>
        {filters.map((filter, index) => (
          <HStack key={index} spacing={4}>
            <Select placeholder="Select Category" value={filter.category} onChange={(e) => updateFilter(index, "category", e.target.value)}>
              {Object.keys(metrics).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            <Select placeholder="Select Metric" value={filter.metric} onChange={(e) => updateFilter(index, "metric", e.target.value)} isDisabled={!filter.category}>
              {filter.category &&
                metrics[filter.category].map((metric) => (
                  <option key={metric} value={metric}>
                    {metric}
                  </option>
                ))}
            </Select>
            <Input placeholder="Min" value={filter.min} onChange={(e) => updateFilter(index, "min", e.target.value)} />
            <Input placeholder="Max" value={filter.max} onChange={(e) => updateFilter(index, "max", e.target.value)} />
          </HStack>
        ))}
        <HStack spacing={4}>
          {Object.keys(initialStocks[0]).map((column) => (
            <Checkbox key={column} isChecked={selectedColumns.includes(column)} onChange={() => toggleColumn(column)}>
              {column}
            </Checkbox>
          ))}
        </HStack>
        <Table variant="simple">
          <Thead>
            <Tr>
              {selectedColumns.map((column) => (
                <Th key={column}>{column}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {stocks.map((stock) => (
              <Tr key={stock.symbol}>
                {selectedColumns.map((column) => (
                  <Td key={column}>{stock[column]}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;
