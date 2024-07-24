<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class FaqSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Faq::create([
            'question' => 'What is cryptocurrency?',
            'answer' => 'Cryptocurrency is a digital or virtual currency that uses cryptography for security and operates independently of a central bank.',
        ]);

        Faq::create([
            'question' => 'How do I start investing in cryptocurrency?',
            'answer' => 'To start investing, create an account on our platform, complete the verification process, and deposit funds. Once done, you can choose from various cryptocurrencies to invest in.',
        ]);

        Faq::create([
            'question' => 'Can I trade cryptocurrencies on your platform?',
            'answer' => 'Yes, our platform supports trading of various cryptocurrencies. You can buy, sell, and trade cryptocurrencies with ease using our user-friendly interface.',
        ]);

        Faq::create([
            'question' => 'How can I track the performance of my cryptocurrency investments?',
            'answer' => 'You can track your investments through our platform\'\s dashboard, which provides real-time updates, performance charts, and detailed reports.',
        ]);

        Faq::create([
            'question' => 'Is there a minimum amount required to start investing?',
            'answer' => 'Yes, there is a minimum investment amount required, which varies depending on the plan. Please check our platform for specific details.',
        ]);

        Faq::create([
            'question' => 'How do I withdraw my funds from the platform?',
            'answer' => 'To withdraw funds, navigate to the withdrawal section on your account dashboard, select the cryptocurrency, enter the amount, and provide the wallet address where you want to receive the funds.',
        ]);

        Faq::create([
            'question' => 'What customer support options are available?',
            'answer' => 'We offer 24/7 customer support through live chat, email, and phone. Our support team is ready to assist you with any questions or issues you may encounter.',
        ]);
    }
}
