import TermAndCondition from '@/models/api/TermAndCondition';
import { getAllTermsAndConditions } from '@/services/api/termsAndConditionsApi';
import { useState, useEffect } from 'react';
import { Loading } from './Loading';

export default function Terms() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [termsAndConditions, setTermsAndConditions] = useState<
    TermAndCondition[]
  >([]);

  useEffect(() => {
    getAllTermsAndConditions()
      .then((result) => {
        setTermsAndConditions(result);
        setIsLoading(false);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold pb-5">Termos e condições</h1>
      {isLoading ? (
        <Loading />
      ) : (
        termsAndConditions.map((term, index) => (
          <div className="text-base normal-case text-justify" key={index}>
            {`${index + 1}. ${(term as any).term}`}
          </div>
        ))
      )}
    </div>
  );
}
