import { useState } from 'react';

import Section from 'components/Section';
import Notification from 'components/Notification';
import Statistics from 'components/Statistics';
import FeedBackOptions from 'components/FeedBackOptions';

import css from 'components/App.module.scss';

export const App = () => {
    // ================== STATE
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    // ================== /STATE

    // ================== LOGIC
    const addFeedback = feedback => {
        switch (feedback) {
            case "good":
              setGood(good + 1);
              break;
            case "neutral":
              setNeutral(neutral + 1);
              break;
            case "bad":
              setBad(bad + 1);
              break;
            default:
              return;
          }
    };

    const countTotalFeedback = () => good + neutral + bad;

    const countPositiveFeedbackPercentage = () =>
        countTotalFeedback() !== 0
            ? Math.round((good / countTotalFeedback()) * 100)
            : 0;
    // ================== /LOGIC

    return (
        <div className={css.container}>
            <Section title={'Please leave feedback'}>
                <FeedBackOptions
                    options={Object.keys({ good, neutral, bad })}
                    onLeaveFeedback={addFeedback}
                />
            </Section>
            <Section title={'Statistics'}>
                {countTotalFeedback() === 0 ? (
                    <Notification message={'There is no feedback'} />
                ) : (
                    <Statistics
                        feedbacks={{ good, neutral, bad }}
                        total={countTotalFeedback()}
                        positivePercentage={countPositiveFeedbackPercentage()}
                    />
                )}
            </Section>
        </div>
    );
};
