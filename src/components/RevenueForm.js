'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';

const RevenueForm = () => {
  const [revenue1, setRevenue1] = useState(0);
  const [revenue2, setRevenue2] = useState(0);
  const [revenue3, setRevenue3] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(null);

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('revenue_sources')
        .insert([{ revenue1, revenue2, revenue3 }])
        .select('total_revenue')
        .single();

      if (error) {
        throw error;
      }

      setTotalRevenue(data.total_revenue);
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };

  const handleInputChange = (setter) => (event) => {
    const value = parseFloat(event.target.value) || 0;
    setter(value);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Input
        type="number"
        placeholder="Revenue Source 1"
        value={revenue1}
        onChange={handleInputChange(setRevenue1)}
      />
      <Input
        type="number"
        placeholder="Revenue Source 2"
        value={revenue2}
        onChange={handleInputChange(setRevenue2)}
      />
      <Input
        type="number"
        placeholder="Revenue Source 3"
        value={revenue3}
        onChange={handleInputChange(setRevenue3)}
      />
      <Button onClick={handleSubmit}>Submit</Button>
      {totalRevenue !== null && (
        <div className="mt-4 text-lg">
          Total Revenue: ${totalRevenue}
        </div>
      )}
    </div>
  );
};

export default RevenueForm;