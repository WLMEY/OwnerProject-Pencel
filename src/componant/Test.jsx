









import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Test = () => {
    const navigate = useNavigate();
    const [Question, setQuestion] = useState([]);
    const [words, setWords] = useState([]);
    const [ansEnglish, setAnsEnglish] = useState([]);
    const [newReviw, setNewReviw] = useState([]);
    const [statistics, setStatistics] = useState(null);
    const [review, setReview] = useState(0);
    const [Q_No, setQ_No] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const Question_No = 10;

    // دالة حساب وإرسال الذاكرة مع التحسينات
    const sendMemory = async() => {
        setIsLoading(true);
        try {
            // التحقق من وجود statistics وقيمها المطلوبة
            if (!statistics || 
                statistics.Mistakes === undefined || 
                statistics.Reviewed === undefined || 
                statistics.Reviewed === 0) {
                console.warn('Cannot calculate memory - missing or invalid data');
                return;
            }

            // حساب الذاكرة مع تقريب النتيجة
            const memoryValue = Math.round(100 - ((statistics.Mistakes / statistics.Reviewed) * 100));
            
            // التحقق من أن النتيجة صالحة قبل الإرسال
            if (!isNaN(memoryValue) && isFinite(memoryValue)) {
                await axios.patch("http://localhost:5000/Statistics/1", {
                    Memory: memoryValue
                });
                console.log("Memory sent successfully:", memoryValue);
            } else {
                console.warn("Invalid memory calculation result");
            }
        } catch (error) {
            console.error('Error updating memory:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect لإرسال الذاكرة عند تغير الإحصائيات
    useEffect(() => {
        if (statistics && statistics.Mistakes !== undefined && statistics.Reviewed !== undefined) {
            sendMemory();
        }
    }, [statistics?.Mistakes, statistics?.Reviewed]);

    const goto = () => navigate("/review");

    // جلب البيانات الأولية
    const Get_Words = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get("http://localhost:5000/words");
            const { data: stat } = await axios.get("http://localhost:5000/Statistics/1");
            setStatistics(stat);
            setWords(data);
            setReview(stat?.Reviewed || 0);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // إعداد الأسئلة
    const QuestionSetting = () => {
        if (!words.length) return;
        const shuffled = [...words].sort(() => 0.5 - Math.random());
        const unReviewed = shuffled.filter(word => !word.Reviewed);
        setQuestion(unReviewed.slice(0, Question_No));
    };

    // تحديث الإحصائيات بعد إنهاء الاختبار
    const updateStatistics = async () => {
        if (!statistics) return;
        setIsLoading(true);
        
        try {
            // حساب عدد الأخطاء
            const mistakesCount = Question.filter((q, i) => q.English !== (ansEnglish[i] || "")).length;
            
            // تحديث عدد المراجعات والأخطاء
            const newReviewedCount = review + Question.length;
            await axios.patch("http://localhost:5000/Statistics/1", { 
                Reviewed: newReviewedCount,
                Mistakes: statistics.Mistakes + mistakesCount,
                Tests: statistics.Tests + 1
            });
            
            // تحديث الحالة المحلية
            setStatistics(prev => ({
                ...prev,
                Reviewed: newReviewedCount,
                Mistakes: prev.Mistakes + mistakesCount,
                Tests: prev.Tests + 1
            }));
            
            return true;
        } catch (error) {
            console.error("Error updating statistics:", error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // تصحيح الإجابات وإرسال البيانات
    const Correction = async () => {
        setIsLoading(true);
        const updatedReview = Question.map((q, i) => ({
            ...q,
            mistakes: q.English !== (ansEnglish[i] || ""),
            Reviewed: true,
        }));
        
        try {
            // إرسال نتائج الاختبار
            for (const item of updatedReview) {
                await axios.post("http://localhost:5000/LastTest", item);
            }
            setNewReviw(updatedReview);
            return true;
        } catch (error) {
            console.error("Error sending test results:", error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // معالجة النقر على زر التالي/إرسال
    const handleCheck = async () => {
        if (Q_No < Question.length - 1) {
            setQ_No(Q_No + 1);
            return;
        }

        // عند إنهاء الأسئلة
        setIsLoading(true);
        try {
            const correctionSuccess = await Correction();
            const updateSuccess = await updateStatistics();

            if (correctionSuccess && updateSuccess) {
                goto();
                setQ_No(0);
            }
        } catch (error) {
            console.error("Error in test submission:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Effects
    useEffect(() => {
        Get_Words();
    }, []);

    useEffect(() => {
        if (words.length > 0) {
            QuestionSetting();
        }
    }, [words]);

    return (
        <div className='new'>
            {isLoading && <div className="loading-indicator">Loading...</div>}
            
            <div className='Q_ditils'>
                <span>Question No.: {Q_No + 1}</span>
                <span>Total Questions: {Question.length}</span>
                <span>Type English</span>
            </div>



            {Question.length > 0 && (
                <>
                    <h1>{Question[Q_No]?.Arabic}</h1>
                    <input
                        onKeyDown={
                            (e)=>{
                                if (e .key==="Enter"){
                                    handleCheck();
                                }
                            }
                        }
                        className='boxshadow'
                        value={ansEnglish[Q_No] || ""}
                        onChange={(e) => {
                            const newAnswers = [...ansEnglish];
                            newAnswers[Q_No] = e.target.value;
                            setAnsEnglish(newAnswers);
                        }}
                        type='text'
                        id='englishInput'
                        dir="ltr"
                        lang="en"
                        inputMode="latin"
                        placeholder='English'
                    />
                    <button 
                        
                        onClick={handleCheck} 
                        className='btn boxshadow'
                        disabled={isLoading}
                    >
                        {Q_No < Question.length - 1 ? "Next" : "Submit & Review"}
                    </button>
                </>
            )}
        </div>
    );
};

export default Test;